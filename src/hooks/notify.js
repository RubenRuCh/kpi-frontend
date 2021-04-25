export default function useNotify() {
  function notify(title = '', message = '', type = 'info') {
    this.$notify({
      title,
      message,
      type,
      position: 'bottom-right',
    });
  }

  return {
    notify,
  };
}
