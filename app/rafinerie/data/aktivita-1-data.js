/*
  NASTAVENÍ KONKRÉTNÍ AKTIVITY

  description:
  Popisek zobrazený pod názvem aktivity.

  initialState:
  Výchozí rozmístění vozů. Každá položka představuje jednu kolej.

  checkpoints:
  Jednotlivé úkoly aktivity. Nový checkpoint přidáš zkopírováním jednoho objektu.
*/

window.activityConfig = {
  storageKey: 'rafinery-activity-1-checkpoints',

  title: 'Aktivita 1',
  description: 'Splňuj checkpointy postupně od prvního po poslední.',

  initialState: [
    {
      track: 3,
      wagons: [
        'DB Zagkks',
        'VTG Zacens'
      ]
    },
    {
      track: 8,
      wagons: [
        'ČD Cargo Zacns'
      ]
    }
  ],

  checkpoints: [
    {
      count: 1,
      from: 2,
      to: 26,
      wagon: 'DB Zagkks',
      description: 'Na naložení LPG'
    },
    {
      count: 1,
      from: 2,
      to: 26,
      wagon: 'DB Zagkks',
      description: 'Na naložení LPG'
    },
    {
      count: 1,
      from: 2,
      to: 26,
      wagon: 'DB Zagkks',
      description: 'Na naložení LPG'
    }
  ]
};
