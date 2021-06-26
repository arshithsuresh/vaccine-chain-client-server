
sudo -i -u postgres



CREATE TABLE manufacturer(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    publickey VARCHAR(264) NOT NULL,
    manufactureaddress VARCHAR(264) NOT NULL
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

INSERT INTO manufacturer (username,publickey,manufactureaddress) values ('8137856339','029ca1998e5474ae861ecc24fddc379c64b273e76b469b16e39b7b5e35f8058f78','0x123');