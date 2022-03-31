CREATE TABLE IF NOT EXISTS locationtable(
    locationtime TEXT PRIMARY KEY,
    latitude TEXT, 
    longitude TEXT,
);

INSERT or IGNORE INTO locationtable(locationtime, latitude, longitude) VALUES ("1648669065147", "43.2603136", "-79.9768576");
INSERT or IGNORE INTO locationtable(locationtime, latitude, longitude) VALUES ("1648669065164", "42.2603136", "-80.9768576");