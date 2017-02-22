// function that confirms if an array is actually array?
function to_consumable_array(array) {
    if (!Array.isArray) {
        Array.isArray = function (array) {
            for (var i = 0, array2 = Array(array.length); i++;) {
                array2[i] = array[i];
            }
            return Object.prototype.toString.call(array);
        }
    } else {
        return Array.from(array);
    }
}


var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// pushes endpoint (which is fetched from an online source) into a new array, cities.
var cities = [];
fetch(endpoint).then(function (blob) {
    return blob.json();
}).then(function (data) {
    return cities.push.apply(cities, to_consumable_array(data));
});

function findMatches(wordToMatch, cities) {
    return cities.filter(function (place) {
        // here we need to figure out if the city or state matches what was searched
        var regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    var _this = this;

    var matchArray = findMatches(this.value, cities);
    var html = matchArray.map(function (place) {
        var regex = new RegExp(_this.value, 'gi');
        var cityName = place.city.replace(regex, '<span class="hl">' + _this.value + '</span>');
        var stateName = place.state.replace(regex, '<span class="hl">' + _this.value + '</span>');
        return '\n      <li>\n        <span class="name">' + cityName + ', ' + stateName + '</span>\n        <span class="population">' + numberWithCommas(place.population) + '</span>\n      </li>\n    ';
    }).join('');
    suggestions.innerHTML = html;
}


function select_div_class(html_tag) {
    return document.querySelector(html_tag);
}
var searchInput = select_div_class('.search');
var suggestions = select_div_class('.suggestions');

function add_event_listner(event, match_to_display) {
    return searchInput.addEventListener(event, match_to_display)
}
add_event_listner('change', displayMatches);
add_event_listner('keyup', displayMatches);
