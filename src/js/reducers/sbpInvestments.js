function sbpInvestment (state = {}, action) {
  switch (action.type) {
    case "add":
      return action.data
    default:
      return state
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        sbpInvestment(undefined, action)
      ]
    default:
      return state
  }
}
