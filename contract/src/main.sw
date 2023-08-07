contract;

use std::{
    auth::msg_sender,
    call_frames::msg_asset_id,
    constants::BASE_ASSET_ID,
    context::{
        msg_amount,
        this_balance,
    },
    token::transfer,
    // bytes:: Bytes, beta-3 doesnt support
    // string::String,
};


struct PropertyMetadata {
    name: str[11],
    location: str[11],
    area_sq_ft: u8,
    bedrooms: u8,
    description: str[20],
    bathrooms: u8,
    images_url: u64,
}


struct Property {
    id: u64,
    price: u64,
    owner: Identity,
    metadata: PropertyMetadata,
}

//  In a Sway contract, it's an outline of all of the functions in the contract. 
// For each function, you must specify its name, input types, return types, and level of storage access.

abi RealEstateStore {
    #[storage(read, write)]
    fn list_property(price: u64, metadata: PropertyMetadata);

    #[storage(read, write), payable]
    fn buy_property(property_id: u64);

    #[storage(read)]
    fn get_property(property_id: u64) -> Property;

    #[storage(read, write)]
    fn initialize_owner() -> Identity;

    #[storage(read)]
    fn withdraw_funds();

    #[storage(read)]
    fn get_count() -> u64;
}

storage {
    property_counter: u64 = 0,
    property_map: StorageMap<u64, Property> = StorageMap {},
    owner: Option<Identity> = Option::None,
}


enum InvalidError {
    IncorrectAssetId: ContractId,
    NotEnoughTokens: u64,
    OnlyOwner: Identity,
}

impl RealEstateStore for Contract {

    #[storage(read, write)]
    fn list_property(price: u64, metadata: PropertyMetadata) {
        storage.property_counter += 1;
        let sender = msg_sender().unwrap();
        let new_property: Property = Property {
            id: storage.property_counter,
            price: price,
            owner: sender,
            metadata: metadata,
        };
        storage.property_map.insert(storage.property_counter, new_property);
    }

    #[storage(read, write), payable]
        fn buy_property(property_id: u64) {
            let asset_id = msg_asset_id();
            require(asset_id == BASE_ASSET_ID, InvalidError::IncorrectAssetId(asset_id));
            let amount = msg_amount();
            let mut property = storage.property_map.get(property_id).unwrap();
            require(amount >= property.price, InvalidError::NotEnoughTokens(amount));

            // Update the owner of the property to the buyer
            property.owner = msg_sender().unwrap();

            // Update the property in the storage map
            storage.property_map.insert(property_id, property);

            // Transfer the full payout to the seller
            transfer(amount, asset_id, property.owner);

            // only charge commission if price is more than 0.1 ETH
            if amount > 100_000_000 {
                // keep a 5% commission
                let commission = amount / 20;
                let new_amount = amount - commission;
                // send the payout minus commission to the seller
                transfer(new_amount, asset_id, property.owner);
            } else {
                // send the full payout to the seller
                transfer(amount, asset_id, property.owner);
            }
        }


    #[storage(read)]
    fn get_property(item_id: u64) -> Property {
        // returns the property for the given item_id
        storage.property_map.get(item_id).unwrap()
    }

    #[storage(read, write)]
    fn initialize_owner() -> Identity {
        let owner = storage.owner;
        // make sure the owner has NOT already been initialized
        require(owner.is_none(), "owner already initialized");
        // get the identity of the sender
        let sender = msg_sender().unwrap(); 
        // set the owner to the sender's identity
        storage.owner = Option::Some(sender);
        // return the owner
        sender
    }

    #[storage(read)]
    fn withdraw_funds() {
        let owner = storage.owner;
        // make sure the owner has been initialized
        require(owner.is_some(), "owner not initialized");
        let sender = msg_sender().unwrap(); 
        // require the sender to be the owner
        require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));

        // get the current balance of this contract for the base asset
        let amount = this_balance(BASE_ASSET_ID);

        // require the contract balance to be more than 0
        require(amount > 0, InvalidError::NotEnoughTokens(amount));
        // send the amount to the owner
        transfer(amount, BASE_ASSET_ID, owner.unwrap());
    }

    #[storage(read)]
    fn get_count() -> u64 {
        storage.property_counter
    }
}