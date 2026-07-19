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
    }
  ],

  checkpoints: [
    {
      count: 1,
      from: 1,
      to: 26,
      wagon: 'DB Zagkks 7920',
      description: 'Přistavit na naložení LPG'
    },
    {
      count: 1,
      from: 3,
      to: 24,
      wagon: 'DB Sggmrs 4954',
      description: 'Přistavit k čištění'
    },
    {
      count: 2,
      from: 3,
      to: 25,
      wagon: 'VTG Zacens 7933', 'VTG Zacens 7834',
      description: 'Přistavit k čištění'
    },
    {
      count: 1,
      from: 2,
      to: 3,
      wagon: 'ČDC Zacns 7836',
      description: 'Přesun k vozům'
    },
    {
      count: 3,
      from: 3,
      to: o1,
      wagon: 'ČDC Zacns 7836', 'VTG Zas 7956', 'KVG Zaes 7978',
      description: 'Přistavit k naložení'
    },
    {
      count: 1,
      from: 26,
      to: 7,
      wagon: 'DB Zagkks 7920',
      description: 'Zvážit'
    },
    {
      count: 1,
      from: 7,
      to: 1,
      wagon: 'DB Zagkks 7920',
      description: 'Připravit k odjezdu'
    },
    {
      count: 2,
      from: 25,
      to: o2,
      wagon: 'VTG Zacens 7933', 'VTG Zacens 7834',
      description: 'Přistavit k naložení'
    },
    {
      count: 3,
      from: o1,
      to: 3,
      wagon: 'ČDC Zacns 7836', 'VTG Zas 7956', 'KVG Zaes 7978',
      description: 'Připravit o odjezdu'
    },
    {
      count: 1,
      from: 2,
      to: 7,
      wagon: 'OnRail Zacens 7933',
      description: 'Zvážit'
    },
    {
      count: 1,
      from: 7,
      to: 2,
      wagon: 'OnRail Zacens 7933',
      description: 'Odstavit'
    }
  ]
};
