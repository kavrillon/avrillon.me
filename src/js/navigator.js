function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (successful) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject();
  }
}

exports.copyTextToClipboard = function(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }

  return navigator.clipboard.writeText(text);
};
