var Team = function (leagueId, name) {
    
    this.leagueId = leagueId;
    this.name     = name;
    
};

var scoringModel = function () {
    
    this.defaultRows = 10;
    this.validScores = [-5, -3, -1, 0, 1, 3, 5];
    
    this.teams = ko.observableArray();
    
    this.scores = ko.observableArray(new Array(this.defaultRows));
    
    this.setRows = function(element) {
        numRows = element.numRows.value;
        
        while (this.scores().length > numRows) {
            this.scores.pop();
        }
        
        while (this.scores().length < numRows) {
            this.scores.push('');
        }
        
    }
    
};

ko.applyBindings(new scoringModel);