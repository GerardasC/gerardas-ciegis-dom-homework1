const baseURL = 'http://localhost:3000'

class API {
  static fetchToys = (success, failure) => {
    fetch(`${baseURL}/toys`)
    .then(res => res.json())
    .then(success)
    .catch(failure)
  }

  static deleteToy = (id, success, failure) => {
    fetch(`${baseURL}/toys/${id}`, { method: 'DELETE' })
    .then(res => res.ok ? success() : failure(res.statusText))
    .catch(failure)
  }
}

// API.fetchToys(
//   console.log,
//   console.log
// )

// API.deleteToy(
//   "1",
//   () => console.log('Istrinta'),
//   console.error
// )