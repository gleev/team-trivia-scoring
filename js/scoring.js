var teams = [];
teams[1020] = 'Insert Clever Name Here';
teams[1021] = 'Trivia Busters';
teams[1022] = 'Show Me On The Doll Where HE Touched You';

var Score = function () {
    var self = this;
    
    self.leagueId = ko.observable("");
    self.teamName = ko.computed(function(element) {
        return teams[self.leagueId()];
    });
    
    self.invalidLeagueId = function() {
        if (self.leagueId() == '') return false;
        
        return (teams[self.leagueId()] == undefined);
    }
};

var scoringModel = function () {
    
    this.defaultRows = 1;
    this.validScores = [-5, -3, -1, 0, 1, 3, 5];
    
    this.teams = ko.observableArray();
    
    this.scores = ko.observableArray();
    
    this.setRowsFromForm = function(element) {
        numRows = element.numRows.value;
        this.setRows(numRows);
    }
    
    this.setRows = function(numRows) {
        while (this.scores().length > numRows) {
            this.scores.pop();
        }
        
        while (this.scores().length < numRows) {
            this.scores.push(new Score());
        }        
    }
    
    this.setRows(this.defaultRows)
};

ko.applyBindings(new scoringModel);