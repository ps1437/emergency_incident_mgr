import { trigger,
        state,
        style,
        query,
        stagger,
        animate,
        transition,
        keyframes } from '@angular/animations';

export const flyin = [
  trigger('flyin', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in')
      ])
    ])
];

export const listAnimation =[
trigger('listAnimation', [
  transition('* => *', [

    query(':enter', style({ opacity: 0 }), {optional: true}),

    query(':enter', stagger('300ms', [
      animate('1s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
      ]))]), {optional: true}),
      query(':leave', stagger('300ms', [
        animate('1s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
          style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
        ]))]), {optional: true})
  ])
])
];


export const fadeInOut = [

  trigger('fade', [

    state('in', style({opacity: 1})),
   transition(':enter', [
      style({opacity: 0}),
      animate(600 )
    ]),
    transition(':leave',
      animate(600, style({opacity: 0})))
  ])
]
export const rotateIn = [
  trigger('rotateIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'rotate(-90deg)'}),
        animate('400ms ease-out')
      ])
    ])
];

export const flyFromBottom = [
  trigger('flyFromBottom', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('300ms ease-in')
      ])
    ])
];

export const flyItems = [
  trigger('flyItems', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(500, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
];
