
const useLocalStorage = () => {
  function getLocal(label) {
    // console.log("getting local " + label, localStorage.getItem(label))
    return JSON.parse(localStorage.getItem(label));
  }

  function setLocal(label, content) {
    // console.log(`setting local: ${label}`, content)
    localStorage.setItem(`${label}`, JSON.stringify(content));
  }
};

export default useLocalStorage;
