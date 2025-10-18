export const getAddressFromLatLong = async (lat, lon) => {
  const res = await fetch(
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=28.594594594594593%2C77.38470265859395&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=mBN-cdOLveHULlFk0QXVX3aIfPyqQuKl41V6hUbqKMA',
  );
  const json = await res.json();
  console.log('===>Address', json);
};
