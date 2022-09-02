export const loadMapApi = () => {
    //const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCM3Dm-SQp5TYZLHRjEYfmGuUG3A1MfS8E&libraries=places&language=no&region=NO&v=quarterly`;
    const mapsURL = "https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyCM3Dm-SQp5TYZLHRjEYfmGuUG3A1MfS8E";
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++){ 
        if(scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
}