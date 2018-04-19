const REGEXP = /(#)(\S+)/;

export default value => (REGEXP.exec(value) || [])[0];
