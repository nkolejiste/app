window.activityConfig = {
  storageKey: 'ironworks-activity-1-checkpoints',

  title: 'Aktivita 1',
  description: 'Zpracuj příchozí vozy, obsluž jednotlivé provozy železáren a připrav odchozí soupravu.',
  documentBase: '../dokumenty/aktivita-1/',

  initialState: [
    {
      track: '1',
      wagons: [
        'Eas – železný šrot',
        'Eas – železný šrot',
        'Tams – sypké materiály',
        'Zags – technické plyny',
      ],
    },
    {
      track: '3',
      wagons: [
        'Shimmns – prázdný',
        'Res – prázdný',
        'Samms – prázdný',
      ],
    },
    {
      track: '6',
      wagons: [
        'Vnitropodnikový šrotový vůz – naložený',
      ],
    },
  ],

  checkpoints: [
    {
      from: '1',
      to: '2',
      wagons: [
        'Eas – železný šrot',
        'Eas – železný šrot',
      ],
      description: 'Zvážit vozy se šrotem na statické kolejové váze',
    },
    {
      from: '2',
      to: '6',
      wagons: [
        'Eas – železný šrot',
        'Eas – železný šrot',
      ],
      description: 'Přistavit vozy k vykládce na šrotové pole',
    },
    {
      from: '1',
      to: '8',
      wagons: [
        'Tams – sypké materiály',
      ],
      description: 'Přistavit k vykládce do skladu sypkých materiálů',
    },
    {
      from: '1',
      to: '9',
      wagons: [
        'Zags – technické plyny',
      ],
      description: 'Přistavit ke stáčení technických plynů',
    },
    {
      from: '3',
      to: '5',
      wagons: [
        'Shimmns – prázdný',
        'Res – prázdný',
        'Samms – prázdný',
      ],
      description: 'Přistavit prázdné vozy k nakládce hotových výrobků',
    },
    {
      from: '6',
      to: '7',
      wagons: [
        'Vnitropodnikový šrotový vůz – naložený',
      ],
      description: 'Přesunout šrot ze šrotového pole k elektrické peci',
    },
    {
      from: '7',
      to: '6',
      wagons: [
        'Vnitropodnikový šrotový vůz – prázdný',
      ],
      description: 'Vrátit prázdný vnitropodnikový vůz na šrotové pole',
    },
    {
      from: '6',
      to: '4',
      wagons: [
        'Eas – prázdný',
        'Eas – prázdný',
      ],
      description: 'Odstavit vyložené vozy do seřadiště',
    },
    {
      from: '8',
      to: '4',
      wagons: [
        'Tams – prázdný',
      ],
      description: 'Odstavit vyložený vůz do seřadiště',
    },
    {
      from: '9',
      to: '4',
      wagons: [
        'Zags – prázdný',
      ],
      description: 'Odstavit vyložený vůz do seřadiště',
    },
    {
      from: '5',
      to: '2',
      wagons: [
        'Shimmns – svitky',
        'Res – hutní materiál',
        'Samms – těžké výrobky',
      ],
      description: 'Zvážit naložené vozy s hotovými výrobky',
      documents: [
        'nakladni-list-01.jpg',
        'nakladni-list-02.jpg',
      ],
    },
    {
      from: '2',
      to: '3',
      wagons: [
        'Shimmns – svitky',
        'Res – hutní materiál',
        'Samms – těžké výrobky',
      ],
      description: 'Zařadit vozy do odchozí soupravy',
    },
    {
      from: '4',
      to: '3',
      wagons: [
        'Eas – prázdný',
        'Tams – prázdný',
        'Zags – prázdný',
      ],
      description: 'Připojit prázdné vozy k odchozí soupravě',
    },
  ],
};
