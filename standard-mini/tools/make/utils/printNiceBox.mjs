
const defaultSettings = {
    frameType: 1,
    frameColor: 'red',
    alignContent: 'center',
    verticalPadding: 1
};

/**
 * Does what the name says.
 *
 * @param {array} lines Lines of text
 */
const printNiceBox = (lines, settings) => {

    settings = {
        ...defaultSettings,
        ...settings
    };

    const makeRepeater = (char, length) => {
        let arr = new Array(length+1);
        return arr.join(char);
    };

    const padLineLeft = (width, len, content) => {
        let pad = (width - len) - 1;
        let leftPad = 1;
        let rightPad = pad - 1;
        return makeRepeater(' ', leftPad) + content + makeRepeater(' ', rightPad);
    };

    const padLineRight = (width, len, content) => {
        let pad = (width - len) - 1;
        let leftPad = pad - 1;
        let rightPad = 1;
        return makeRepeater(' ', leftPad) + content + makeRepeater(' ', rightPad);
    };

    const padLineCenter = (width, len, content) => {
        let pad = ((width - len) - 1) / 2;
        let leftPad = Math.floor(pad);
        let rightPad = Math.ceil(pad);
        return makeRepeater(' ', leftPad) + content + makeRepeater(' ', rightPad);
    };

    const makeLine = (content, width, align='center') => {
        let visibleContent = content.stripColors;
        let len = [...visibleContent].length;

        switch (align) {
            case 'left':
                return padLineLeft(width, len, content);
            case 'right':
                return padLineRight(width, len, content);
            case 'center':
                return padLineCenter(width, len, content);
            default:
                return '';
        }
    };

    const longestLineLength = lines
        .map(line => line.stripColors.length)
        .reduce((prev, item) => (Math.max(prev, item)), 0);

    const padding = 10;
    const width = longestLineLength + padding;
    const horizontalBorder = makeRepeater('─', width-1);

    let { wall, tl, tr, bl, br } = getFrame();

    let verticalPadding = makeRepeater(`    ${wall}${ makeLine('', width) }${wall}\n`, settings.verticalPadding);

    let output = `
    ${tl}${ horizontalBorder.red }${tr}
${verticalPadding}${ lines.map(line => (`    ${wall}${ makeLine(line, width, settings.alignContent) }${wall}`)).join('\n') }
${verticalPadding}    ${bl}${ horizontalBorder.red }${br}
`.red;

    console.log(output);
};

function getFrame(type) {
    return {
        wall: '│'.red,
        tl: '┌'.red,
        tr: '┐'.red,
        bl: '└'.red,
        br: '┘'.red
    };
}

export default printNiceBox;
