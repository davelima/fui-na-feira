chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': screen.width,
      'height': screen.height
    }
  });
});
