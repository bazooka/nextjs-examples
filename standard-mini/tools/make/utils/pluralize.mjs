function pluralize(name) {

    if(name.slice(-1) === 'y') {
        return name.slice(0, -1) + 'ies';
    }

    if(name.slice(-1) === 's') {
        return name;
    }

    return name + 's';
}

export default pluralize;
