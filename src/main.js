var Direction = {
    NORTH: 0,
    EAST: 3,
    SOUTH: 6,
    WEST: 9
};

var Fleet = {
    AIRCRAFTCARRIER: {type: 'Aircraft Carrier', size: 5},
    BATTLESHIP: {type: 'Battleship', size: 4},
    CRUISER: {type: 'Crusier', size: 3},
    DESTROYER: {type: 'Destroyer', size: 2},
    SUBMARINE: {type: 'Submarine', size: 1}
};

/* Tile Object */
function Tile() {
    this.location = [];
    this.occupied = false;
    this.ship = null;
    this.hasBeenFiredOn = false;
}
Tile.prototype.getLocation = function() {
    return this.location;
};
Tile.prototype.setLocation = function(x, y) {
    this.location = [x, y];
};
Tile.prototype.getOccupied = function() {
    return this.occupied;
};
Tile.prototype.setOccupied = function(tf) {
    this.occupied = tf;
};
Tile.prototype.getHasBeenFiredOn = function() {
    return this.hasBeenFiredOn;
};
Tile.prototype.setHasBeenFiredOn = function(tf) {
    this.hasBeenFiredOn = tf;
};

/* Ship Object */
function Ship() {
    this.isActive = false;
    this.shipType = 'Ship';
    this.shipSize = 0;
    this.tilesOccupied = [];
    this.bowDirection = Direction.NORTH;
    this.bowLocation = [];
    this.sternLocation = [];
}

/* Game Grid Object */
var gameGrid = {
    tiles: [[]],
    fleet: [],
    init: function(boardLength) {
        ++boardLength;
        for (var x = 1; x < boardLength; x++) {
            for (var y = 1; y < boardLength; y++) {
                var tile = new Tile();
                tile.setLocation(x, y);
                this.tiles[[x, y]] = tile;
            }
        }
    },
    initFleet: function(arrayOfFleetObjects) {
        for (var s = 0; s < arrayOfFleetObjects.length; s++) {
            this.fleet.push(this.buildShip(arrayOfFleetObjects[s]));
        }
    },
    buildShip: function(s) {
        var ship = new Ship();
        ship.isActive = s.isActive;
        ship.shipType = s.shipType;
        ship.shipSize = s.shipSize;
        ship.bowDirection = s.bowDirection || ship.bowDirection; //Check this!!!
        ship.bowLocation = s.bowLocation;
        var x = ship.bowLocation[0], y = ship.bowLocation[1];
        for (var sz = 0; sz < ship.shipSize; sz++) {
            var tile = this.tileFromLocation(x, y);
            tile.setOccupied(true);
            ship.tilesOccupied.push(tile);
            switch (ship.bowDirection) {
                case Direction.NORTH:
                    x++;
                    break;
                case Direction.EAST:
                    y--;
                    break;
                case Direction.SOUTH:
                    x--;
                    break;
                case Direction.WEST:
                    y++;
                    break;
            }
        }
        //ship.sternLocation = ?;
        return ship;
    },
    tileFromLocation: function(x, y) {
        return this.tiles[[x, y]];
    }
};

gameGrid.init(10);
var tile = gameGrid.tileFromLocation(10, 10);
console.log(tile);
var ship = {
    isActive: true,
    shipType: Fleet.AIRCRAFTCARRIER.type,
    shipSize: Fleet.AIRCRAFTCARRIER.size,
    bowDirection: Direction.NORTH,
    bowLocation: [1, 1]
};
fleetObjects = [ship];
gameGrid.initFleet(fleetObjects);
console.dir(gameGrid.fleet);
