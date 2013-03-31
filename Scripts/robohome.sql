CREATE DATABASE IF NOT EXISTS `robohome`;

CREATE TABLE IF NOT EXISTS robohome.rooms(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.types(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.items(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, brand VARCHAR(45) NOT NULL, ip VARCHAR(45) NOT NULL, roomId INT NOT NULL, typeId INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.methods(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, signature VARCHAR(45) NOT NULL, type VARCHAR(45) NOT NULL, typeId INT, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.events(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, typeId INT NOT NULL, itemId INT, roomId INT, `trigger` VARCHAR(45) NOT NULL, enabled INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.conditions(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT NOT NULL, methodId INT NOT NULL, equivalence VARCHAR(45) NOT NULL, value INT NOT NULL, eventId INT NOT NULL, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.actions(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT, roomId INT, eventId INT NOT NULL, methodId INT NOT NULL, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.users (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name varchar(200) NOT NULL, email varchar(200) NOT NULL, openid varchar(200) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.whitelist (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, email varchar(200) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.energy (time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, watts INT);

INSERT INTO robohome.`types` (name) VALUES ('motionSensor');
INSERT INTO robohome.`types` (name) VALUES ('lightSensor');
INSERT INTO robohome.`types` (name) VALUES ('temperatureSensor');
INSERT INTO robohome.`types` (name) VALUES ('energyMonitor');
INSERT INTO robohome.`types` (name) VALUES ('button');
INSERT INTO robohome.`types` (name) VALUES ('door');
INSERT INTO robohome.`types` (name) VALUES ('window');
INSERT INTO robohome.`types` (name) VALUES ('curtain');
INSERT INTO robohome.`types` (name) VALUES ('plug');
INSERT INTO robohome.`types` (name) VALUES ('light');
INSERT INTO robohome.`types` (name) VALUES ('radiator');


INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Motion Detected', 'getState', 'status', 1);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Light Intensity', 'getState', 'status', 2);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Temperature in Degrees', 'getState', 'status', 3);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Energy Level', 'getState', 'status', 4);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Button Pressed', 'getState', 'status', 5);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('On', 'getState', 'state', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn On', 'on', 'action', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn Off', 'off', 'action', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Lights on', 'getState', 'state', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn On', 'on', 'action', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn Off', 'off', 'action', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Temperature in Degrees', 'getState', 'state', 11);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Set Temperature', 'setTemperature', 'state', 11);

-- SAMPLE DATA

INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Lounge');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Kitchen');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bathroom');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bedroom 1');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bedroom 2');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Office');

INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Door', 'mock', '192.168.0.100', 1, 6);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Curtain', 'mock', '192.168.0.101', 1, 8);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Motion', 'mock', '192.168.0.102', 1, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Light', 'mock', '192.168.0.103', 1, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Window', 'mock', '192.168.0.104', 2, 7);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Plug', 'mock', '192.168.0.105', 2, 9);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Light', 'mock', '192.168.0.106', 2, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bathroom Curtain', 'mock', '192.168.0.107', 3, 8);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bathroom Motion', 'mock', '192.168.0.108', 3, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Motion', 'mock', '192.168.0.109', 4, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.110', 4, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.111', 5, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.112', 5, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Office Plug', 'mock', '192.168.0.113', 6, 9);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Office Plug', 'mock', '192.168.0.114', 6, 9);

INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event1', 6, NULL, 1, 'opened', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event2', 1, NULL, 1, 'motion detected', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event3', 7, NULL, 2, 'opened', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event4', 10, NULL, 2, 'on', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event5', 1, NULL, 4, 'motion detected', 1);

INSERT INTO `robohome`.`conditions` (`itemId`, `methodId`, `equivalence`, `value`, `eventId`) VALUES (2, 14, '=', 1, 1);
INSERT INTO `robohome`.`conditions` (`itemId`, `methodId`, `equivalence`, `value`, `eventId`) VALUES (4, 21, '=', 1, 1);

INSERT INTO `robohome`.`actions` (`itemId`, `roomId`, `eventId`, `methodId`) VALUES (NULL, 4, 1, 22);
INSERT INTO `robohome`.`actions` (`itemId`, `roomId`, `eventId`, `methodId`) VALUES (2, NULL, 1, 16);

/* js function to generate output
    (function() {
        var today = new Date(2013, 01, 01, 00, 00, 00),
            tomorrow,
            j;
        for(var i = 0; i < 100; i++) {
            j = Math.round(500 * Math.sin(i) + 500);
            console.log(today);
            tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            $('#debug').append('INSERT INTO robohome.`energy` (time, watts) VALUES (\'' +
                today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +
                '00:00:00' + '\', ' + j + ')\;<br />');
            today = tomorrow;
        }
    })();
*/

INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-1 00:00:00', 500);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-2 00:00:00', 921);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-3 00:00:00', 955);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-4 00:00:00', 571);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-5 00:00:00', 122);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-6 00:00:00', 21);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-7 00:00:00', 360);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-8 00:00:00', 828);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-9 00:00:00', 995);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-10 00:00:00', 706);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-11 00:00:00', 228);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-12 00:00:00', 0);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-13 00:00:00', 232);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-14 00:00:00', 710);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-15 00:00:00', 995);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-16 00:00:00', 825);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-17 00:00:00', 356);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-18 00:00:00', 19);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-19 00:00:00', 125);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-20 00:00:00', 575);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-21 00:00:00', 956);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-22 00:00:00', 918);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-23 00:00:00', 496);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-24 00:00:00', 77);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-25 00:00:00', 47);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-26 00:00:00', 434);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-27 00:00:00', 881);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-2-28 00:00:00', 978);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-1 00:00:00', 635);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-2 00:00:00', 168);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-3 00:00:00', 6);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-4 00:00:00', 298);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-5 00:00:00', 776);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-6 00:00:00', 1000);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-7 00:00:00', 765);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-8 00:00:00', 286);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-9 00:00:00', 4);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-10 00:00:00', 178);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-11 00:00:00', 648);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-12 00:00:00', 982);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-13 00:00:00', 873);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-14 00:00:00', 421);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-15 00:00:00', 42);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-16 00:00:00', 84);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-17 00:00:00', 509);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-18 00:00:00', 925);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-19 00:00:00', 951);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-20 00:00:00', 562);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-21 00:00:00', 116);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-22 00:00:00', 23);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-23 00:00:00', 369);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-24 00:00:00', 835);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-25 00:00:00', 993);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-26 00:00:00', 698);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-27 00:00:00', 221);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-28 00:00:00', 0);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-29 00:00:00', 239);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-30 00:00:00', 718);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-3-31 00:00:00', 996);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-1 00:00:00', 818);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-2 00:00:00', 348);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-3 00:00:00', 17);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-4 00:00:00', 130);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-5 00:00:00', 584);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-6 00:00:00', 960);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-7 00:00:00', 913);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-8 00:00:00', 487);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-9 00:00:00', 72);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-10 00:00:00', 51);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-11 00:00:00', 443);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-12 00:00:00', 887);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-13 00:00:00', 976);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-14 00:00:00', 627);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-15 00:00:00', 162);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-16 00:00:00', 7);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-17 00:00:00', 306);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-18 00:00:00', 783);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-19 00:00:00', 1000);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-20 00:00:00', 757);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-21 00:00:00', 278);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-22 00:00:00', 3);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-23 00:00:00', 185);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-24 00:00:00', 657);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-25 00:00:00', 984);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-26 00:00:00', 867);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-27 00:00:00', 412);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-28 00:00:00', 38);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-29 00:00:00', 89);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-4-30 00:00:00', 518);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-1 00:00:00', 930);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-2 00:00:00', 947);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-3 00:00:00', 553);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-4 00:00:00', 110);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-5 00:00:00', 26);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-6 00:00:00', 377);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-7 00:00:00', 842);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-8 00:00:00', 992);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-9 00:00:00', 690);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-10 00:00:00', 213);
INSERT INTO robohome.`energy` (time, watts) VALUES ('2013-5-11 00:00:00', 0);
