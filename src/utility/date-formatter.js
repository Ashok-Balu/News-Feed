const dateFormatter = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};



export default {
    dateFormatter,
}
