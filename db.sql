
sudo -i -u postgres

CREATE TABLE vaccine(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    address VARCHAR(256),
    batchId VARCHAR(64),
    vaccineCount INTEGER,
    manufactureDate DATE,
    expiryDate DATE,
    currentOwner VARCHAR(256),
    currentLocation VARCHAR(128),
    currentStatus SMALLINT

);

CREATE TABLE manufacturer(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    address VARCHAR(264),
    username VARCHAR(64) NOT NULL,
    publicname VARCHAR(64),
    publickey VARCHAR(264),
    validated SMALLINT NOT NULL,    
    userrole SMALLINT NOT NULL,
    manufactureaddress VARCHAR(264) NOT NULL,
    token VARCHAR(256)
);

CREATE TABLE distributer(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    publickey VARCHAR(264) NOT NULL,
    distributeraddress VARCHAR(264) NOT NULL
);

CREATE TABLE vaccinator(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    publickey VARCHAR(264) NOT NULL,
    vaccinatoraddress VARCHAR(264) NOT NULL
);



INSERT INTO manufacturer (username,publickey,manufactureaddress,userrole,validated,publicname,address) values ('8137856339','029ca1998e5474ae861ecc24fddc379c64b273e76b469b16e39b7b5e35f8058f78','0x123',0,1,'ABC Vaccine Industries','0x1ae3f2cb4fe'); 
INSERT INTO VACCINE (address,batchid,vaccinecount,manufacturedate,expirydate,currentOwner,currentLocation,currentStatus) VALUES();
