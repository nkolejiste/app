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
      track: 2,
      wagons: [
        'ČDC Zacns 7836',
        'OnRail Zacens 7933'
      ]
    },
    {
      track: 1,
      wagons: [
        'DB Zagkks 7920',
        'VTG Zags 7814',
        'VTG Zags 7814',
        'EVA Zags 7915',
        'EVA Zags 7915'
      ]
    },
    {
      track: 3,
      wagons: [
        'DB Sggmrs 4954',
        'VTG Zas 7956',
        'VTG Zacens 7933',
        'VTG Zacens 7834',
        'KVG Zaes 7978'
      ]
    },
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
