var Score = function () {
    var self = this;
    
    self.leagueId = ko.observable("");
    self.franchise = ko.observable("");
    self.teamName = ko.observable("");
    self.venueCity = ko.observable("");
    self.players = ko.observable("");
    self.grandTotal = ko.observable("");

    self.getRank = function(index, parent) {
        if (parent) {
            var scores = $.map(parent.sortedScores(), function (e) {
                return e.grandTotal();
            });

            var uniqueScores = $.grep(scores, function(el, i){
                return i == $.inArray(el , scores);
            });

            return $.inArray(self.grandTotal(), uniqueScores) + 1;
        }
    }
    

};

var scoringModel = function () {
    var self = this;

    this.franchise   = location.search.substring(1,3).toUpperCase();
    this.showName    = ko.observable();
    this.showTime    = ko.observable();
    this.venue       = ko.observable();
    this.venueId     = ko.observable(window.venueId);
    this.venueCity   = ko.observable();
    this.scores      = ko.observableArray();

    this.showUrl = "/" + this.franchise.toLowerCase() + "/tournament";
    this.scoreUrl = this.showUrl + "/getmasterscores/id/" + window.showId + "/format/json";

    this.sortedScores = ko.computed(function () {
        return self.scores.slice().sort(self.sortScores).reverse();
    });

    // fetch show name from server
    $.ajax({
        url: self.showUrl + "/name/id/" + window.showId + "/format/json"
    }).done(function(result) {
        self.showName(result.name);
        self.showTime(result.eventDate);
    });

    // fetch venue info
    $.ajax({
        url: self.showUrl + "/venue/id/" + window.venueId + "/format/json"
    }).done(function(result) {
        self.venue(" - " + result.venue);
        self.venueCity(result.city);
    });

    this.sortScores = function(a, b) {
        if (a && b) {
            return a.grandTotal() > b.grandTotal() ? 1 : -1;
        }
    };

    this.getScores = function() {
        
        $.ajax({
            url: self.scoreUrl
        }).done(function(result) {
            self.scores.removeAll();

            var scores = result.scores;
            if (scores.length > 0) {
                $.each(result.scores, function (i, e) {
                    var s = new Score();

                    s.leagueId(e.teamId);
                    s.franchise(e.franchise);
                    s.teamName(e.teamName);
                    s.players(e.players);
                    s.grandTotal(e.grandTotal);
                    s.venueCity(e.venueCity);

                    self.scores.push(s);
                });
            } else {
                alert("No score data found for this tournament");
            }
        });

    }
};

$(function() {

    window.isTournament = true;
    window.showId = location.search.substring(4);

    var sm = new scoringModel();

    ko.applyBindings(sm);

    sm.getScores(); // initial load of scores

});