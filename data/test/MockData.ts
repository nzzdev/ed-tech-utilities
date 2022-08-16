const emptyActual = [
  [
    "Stadtplanung",
    "Vergangenheit",
    "Zukunft"
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ],
  [
    null,
    null,
    null
  ]
];

const emptyExpect = [
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  },
  {
    "Stadtplanung": "",
    "Vergangenheit": "",
    "Zukunft": ""
  }
];

const strictTypeForPropertyActual = [
  [
    "Stadtplanung",
    "Vergangenheit",
    "Zukunft"
  ],
  [
    "London",
    "true",
    null
  ],
  [
    "Paris",
    "false",
    2
  ],
  [
    "Berlin",
    true,
    23
  ],
  [
    "Zürich",
    true,
    45
  ],
  [
    "Wien",
    false,
    33
  ],
  [
    "Rom",
    true,
    null
  ],
  [
    "Stockholm",
    true,
    null
  ],
  [
    "Prag",
    null,
    null
  ]
];

const strictTypeForPropertyExpect = [
  {
    "Stadtplanung": "London",
    "Vergangenheit": true,
    "Zukunft": ""
  },
  {
    "Stadtplanung": "Paris",
    "Vergangenheit": false,
    "Zukunft": 2
  },
  {
    "Stadtplanung": "Berlin",
    "Vergangenheit": true,
    "Zukunft": 23
  },
  {
    "Stadtplanung": "Zürich",
    "Vergangenheit": true,
    "Zukunft": 45
  },
  {
    "Stadtplanung": "Wien",
    "Vergangenheit": false,
    "Zukunft": 33
  },
  {
    "Stadtplanung": "Rom",
    "Vergangenheit": true,
    "Zukunft": ""
  },
  {
    "Stadtplanung": "Stockholm",
    "Vergangenheit": true,
    "Zukunft": ""
  },
  {
    "Stadtplanung": "Prag",
    "Vergangenheit": "",
    "Zukunft": ""
  }
];

const mixedTypeForPropertyActual = [
  [
    "Stadtplanung",
    "Vergangenheit",
    "Zukunft"
  ],
  [
    "London",
    true,
    null
  ],
  [
    "Paris",
    "false",
    2.2
  ],
  [
    22.554444444,
    true,
    23
  ],
  [
    "Zürich",
    "Berlin",
    45
  ],
  [
    0.11,
    22,
    33
  ],
  [
    "Rom",
    "true",
    "33"
  ],
  [
    "Stockholm",
    "false",
    "22.22"
  ],
  [
    "Prag",
    "null",
    "598273.30823094833234432432425435"
  ]
];

const mixedTypeForPropertyExpect = [
  {
    "Stadtplanung": "London",
    "Vergangenheit": true,
    "Zukunft": ""
  },
  {
    "Stadtplanung": "Paris",
    "Vergangenheit": false,
    "Zukunft": 2.2
  },
  {
    "Stadtplanung": 22.554444444,
    "Vergangenheit": true,
    "Zukunft": 23
  },
  {
    "Stadtplanung": "Zürich",
    "Vergangenheit": "Berlin",
    "Zukunft": 45
  },
  {
    "Stadtplanung": 0.11,
    "Vergangenheit": 22,
    "Zukunft": 33
  },
  {
    "Stadtplanung": "Rom",
    "Vergangenheit": true,
    "Zukunft": 33
  },
  {
    "Stadtplanung": "Stockholm",
    "Vergangenheit": false,
    "Zukunft": 22.22
  },
  {
    "Stadtplanung": "Prag",
    "Vergangenheit": "null",
    "Zukunft": 598273.30823094833234432432425435
  }
];

export { emptyActual, emptyExpect, strictTypeForPropertyActual, strictTypeForPropertyExpect, mixedTypeForPropertyActual, mixedTypeForPropertyExpect }
