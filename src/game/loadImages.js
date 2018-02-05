function loadAssets() {
  const imageDir = './images/',
        images = [
          'channel.png',
          'channel-sprite.png',
          '805659_business_512x512.png'
        ];
  const checkImage = path =>
      new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({path,img});
          img.onerror = () => reject({path, error: 'This is image path not found'});

          img.src = imageDir + path;
      });
  const loadImg = paths => Promise.all(paths.map(checkImage))

  const done = loadImg(images);

  // done.then(images => {
  //   console.log(images)
  // }).catch(err => {
  //   console.log(err)
  // })

  return done;
}

export default loadAssets
