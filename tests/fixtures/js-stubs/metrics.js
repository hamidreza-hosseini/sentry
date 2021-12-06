export function VitalByTransactionAndRating({measurement, ...rest}) {
  return {
    start: '2021-11-28T18:00:00Z',
    end: '2021-11-29T17:07:00Z',
    query: '',
    intervals: [
      '2021-11-28T18:00:00Z',
      '2021-11-28T19:00:00Z',
      '2021-11-28T20:00:00Z',
      '2021-11-28T21:00:00Z',
      '2021-11-28T22:00:00Z',
      '2021-11-28T23:00:00Z',
      '2021-11-29T00:00:00Z',
      '2021-11-29T01:00:00Z',
      '2021-11-29T02:00:00Z',
      '2021-11-29T03:00:00Z',
      '2021-11-29T04:00:00Z',
      '2021-11-29T05:00:00Z',
      '2021-11-29T06:00:00Z',
      '2021-11-29T07:00:00Z',
      '2021-11-29T08:00:00Z',
      '2021-11-29T09:00:00Z',
      '2021-11-29T10:00:00Z',
      '2021-11-29T11:00:00Z',
      '2021-11-29T12:00:00Z',
      '2021-11-29T13:00:00Z',
      '2021-11-29T14:00:00Z',
      '2021-11-29T15:00:00Z',
      '2021-11-29T16:00:00Z',
      '2021-11-29T17:00:00Z',
    ],
    groups: [
      {
        by: {
          transaction: '/bar/:ordId/',
          measurement_rating: 'poor',
        },
        totals: {
          [`count(measurements.${measurement})`]: 913.2667882519335,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            878.0965537951091, 892.4128102279035, 917.4473775231118, 884.0592721573165,
            882.8631377404286, 977.3661107427924, 860.5718105590834, 1036.8824425087375,
            857.4349331408594, 872.0064570283837, 954.3387108987523, 982.0946255973818,
            895.0158989602506, 842.4015901457649, 913.8372197059941, 845.6186018412996,
            971.3439877765327, 977.5787125586039, 934.8308904844635, 924.3141080070806,
            889.9088931286851, 861.11871846869, 945.2639201121442, 921.5961349370338,
          ],
        },
      },
      {
        by: {
          transaction: '/bar/:ordId/',
          measurement_rating: 'meh',
        },
        totals: {
          [`count(measurements.${measurement})`]: 537.0443448410027,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            480.25279914214235, 446.2470330439192, 540.2723720628555, 578.8238603650881,
            521.333776306769, 565.7998107918086, 552.484459768386, 556.4380473259937,
            463.13632179530805, 610.3239126307383, 568.8398422912862, 490.7285481925072,
            490.1492659201988, 688.3569072836312, 510.38437163872817, 468.3917658669178,
            536.6355696057205, 600.5027568777354, 584.3668758514351, 513.1971531199883,
            523.7434867072411, 503.6169448603595, 578.9628659414907, 516.0755287938185,
          ],
        },
      },
      {
        by: {
          transaction: '/bar/:ordId/',
          measurement_rating: 'good',
        },
        totals: {
          [`count(measurements.${measurement})`]: 310.99324556336916,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            301.84940453421194, 304.68814732362097, 301.9642776305766, 314.8072375586307,
            257.72640884714446, 269.49092851324036, 319.92471568867126, 396.0333440504141,
            282.919294815697, 288.60267153849486, 322.426440794062, 346.5679457744942,
            267.26706655618057, 282.60480093597107, 370.6681650255792, 315.29666480842457,
            265.5579090319123, 290.3702317378042, 320.76893279514263, 268.56980240674466,
            305.2517365496022, 359.1337295658047, 351.25740663127016, 360.09063040716416,
          ],
        },
      },
      {
        by: {
          transaction: '/foo/:ordId/',
          measurement_rating: 'poor',
        },
        totals: {
          [`count(measurements.${measurement})`]: 334.68332989807976,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            250.3774996770386, 371.6466508301939, 389.0367396067616, 364.3194808493991,
            200.31796886834115, 382.2695255829035, 315.19978364600627, 343.65161544673435,
            394.0993214558925, 303.2183329284477, 331.8381124232099, 303.94194516767607,
            340.4228803656242, 381.4180332281987, 282.5149785708053, 338.32392357546075,
            375.26120755255505, 320.6268918566363, 342.67556406266016, 386.13447628268096,
            295.9214530587189, 339.2846900047603, 328.4972817992001, 351.4015607140078,
          ],
        },
      },
      {
        by: {
          transaction: '/foo/:ordId/',
          measurement_rating: 'meh',
        },
        totals: {
          [`count(measurements.${measurement})`]: 678.2848709983151,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            738.9628961315675, 705.2147839253868, 697.751323586985, 653.2820567061374,
            699.4645282581238, 700.331139178481, 631.6492978710824, 676.3301175125379,
            700.0691909918392, 617.811038380621, 633.3687666897259, 681.3519605114661,
            611.249828862686, 766.978701600396, 643.6410515518786, 657.3410014185681,
            686.015959783348, 671.9266141784133, 605.9418411945506, 726.4657471925115,
            659.4387670283122, 753.9380543234423, 667.663440593371, 692.6487964881304,
          ],
        },
      },
      {
        by: {
          transaction: '/foo/:ordId/',
          measurement_rating: 'good',
        },
        totals: {
          [`count(measurements.${measurement})`]: 733.2314556449236,
        },
        series: {
          [`count(measurements.${measurement})`]: [
            683.3645918170907, 686.2188745079375, 638.5992986501745, 841.2356927608002,
            720.2768463363028, 673.2745128606168, 761.1691750270439, 636.7014142246217,
            736.3066317858726, 675.5427607945265, 797.414473494506, 754.1362217563709,
            823.6054166454319, 823.1661228528734, 735.0667781152059, 660.091968157567,
            796.9495156603859, 833.8338192681684, 567.1501332017398, 766.8072144861334,
            708.6535847611542, 758.9221705046135, 696.004647987263, 823.0630698217697,
          ],
        },
      },
    ],
    ...rest,
  };
}

export function SingleFieldArea({field, includePrevious = false, ...rest} = {}) {
  if (!includePrevious) {
    return {
      start: '2021-12-01T16:15:00Z',
      end: '2021-12-02T16:15:00Z',
      query: 'transaction:foo',
      intervals: [
        '2021-12-01T16:15:00Z',
        '2021-12-01T16:30:00Z',
        '2021-12-01T16:45:00Z',
        '2021-12-01T17:00:00Z',
        '2021-12-01T17:15:00Z',
        '2021-12-01T17:30:00Z',
        '2021-12-01T17:45:00Z',
        '2021-12-01T18:00:00Z',
        '2021-12-01T18:15:00Z',
        '2021-12-01T18:30:00Z',
        '2021-12-01T18:45:00Z',
        '2021-12-01T19:00:00Z',
        '2021-12-01T19:15:00Z',
        '2021-12-01T19:30:00Z',
        '2021-12-01T19:45:00Z',
        '2021-12-01T20:00:00Z',
        '2021-12-01T20:15:00Z',
        '2021-12-01T20:30:00Z',
        '2021-12-01T20:45:00Z',
        '2021-12-01T21:00:00Z',
        '2021-12-01T21:15:00Z',
        '2021-12-01T21:30:00Z',
        '2021-12-01T21:45:00Z',
        '2021-12-01T22:00:00Z',
        '2021-12-01T22:15:00Z',
        '2021-12-01T22:30:00Z',
        '2021-12-01T22:45:00Z',
        '2021-12-01T23:00:00Z',
        '2021-12-01T23:15:00Z',
        '2021-12-01T23:30:00Z',
        '2021-12-01T23:45:00Z',
        '2021-12-02T00:00:00Z',
        '2021-12-02T00:15:00Z',
        '2021-12-02T00:30:00Z',
        '2021-12-02T00:45:00Z',
        '2021-12-02T01:00:00Z',
        '2021-12-02T01:15:00Z',
        '2021-12-02T01:30:00Z',
        '2021-12-02T01:45:00Z',
        '2021-12-02T02:00:00Z',
        '2021-12-02T02:15:00Z',
        '2021-12-02T02:30:00Z',
        '2021-12-02T02:45:00Z',
        '2021-12-02T03:00:00Z',
        '2021-12-02T03:15:00Z',
        '2021-12-02T03:30:00Z',
        '2021-12-02T03:45:00Z',
        '2021-12-02T04:00:00Z',
        '2021-12-02T04:15:00Z',
        '2021-12-02T04:30:00Z',
        '2021-12-02T04:45:00Z',
        '2021-12-02T05:00:00Z',
        '2021-12-02T05:15:00Z',
        '2021-12-02T05:30:00Z',
        '2021-12-02T05:45:00Z',
        '2021-12-02T06:00:00Z',
        '2021-12-02T06:15:00Z',
        '2021-12-02T06:30:00Z',
        '2021-12-02T06:45:00Z',
        '2021-12-02T07:00:00Z',
        '2021-12-02T07:15:00Z',
        '2021-12-02T07:30:00Z',
        '2021-12-02T07:45:00Z',
        '2021-12-02T08:00:00Z',
        '2021-12-02T08:15:00Z',
        '2021-12-02T08:30:00Z',
        '2021-12-02T08:45:00Z',
        '2021-12-02T09:00:00Z',
        '2021-12-02T09:15:00Z',
        '2021-12-02T09:30:00Z',
        '2021-12-02T09:45:00Z',
        '2021-12-02T10:00:00Z',
        '2021-12-02T10:15:00Z',
        '2021-12-02T10:30:00Z',
        '2021-12-02T10:45:00Z',
        '2021-12-02T11:00:00Z',
        '2021-12-02T11:15:00Z',
        '2021-12-02T11:30:00Z',
        '2021-12-02T11:45:00Z',
        '2021-12-02T12:00:00Z',
        '2021-12-02T12:15:00Z',
        '2021-12-02T12:30:00Z',
        '2021-12-02T12:45:00Z',
        '2021-12-02T13:00:00Z',
        '2021-12-02T13:15:00Z',
        '2021-12-02T13:30:00Z',
        '2021-12-02T13:45:00Z',
        '2021-12-02T14:00:00Z',
        '2021-12-02T14:15:00Z',
        '2021-12-02T14:30:00Z',
        '2021-12-02T14:45:00Z',
        '2021-12-02T15:00:00Z',
        '2021-12-02T15:15:00Z',
        '2021-12-02T15:30:00Z',
        '2021-12-02T15:45:00Z',
        '2021-12-02T16:00:00Z',
      ],
      groups: [
        {
          by: {},
          totals: {
            [field]: 462.32331107946504,
          },
          series: {
            [field]: [
              443.6200417187068, 471.7512262596214, 632.5356294251225, 538.6063865509535,
              524.4706847412767, 552.1308328866158, 491.4847951529728, 540.5649544109818,
              430.31622543090765, 513.2803858330382, 498.20598088568426,
              503.9482408241235, 496.3081254057422, 530.4951893480746, 510.9472734431329,
              534.2121619563322, 580.24191602519, 582.2308981360263, 628.6978339387008,
              569.093042423482, 625.5703758567254, 529.286046746119, 491.3038256504387,
              548.2822063955006, 569.3739373104116, 579.5492159758986, 483.9070230718182,
              529.9636517032774, 554.3095224302028, 546.8567462459974, 574.3167313021837,
              578.9293435905665, 561.8965496805288, 576.137674866579, 529.6122522035633,
              513.9424504410429, 543.8130703563698, 597.6542214420452, 510.1568375049254,
              510.7187029189223, 433.78137928589973, 539.3227194785493,
              436.44338223053234, 607.1985174516628, 524.8753880194068, 501.7107697990002,
              514.0727518760925, 541.2173843758375, 556.0898842681038, 535.6274044037233,
              475.75355633285346, 587.3256393771101, 494.61335151920775,
              643.5242484747213, 519.9786827806394, 534.7536939750254, 570.1995703475561,
              452.91363051761834, 613.7709480932585, 520.9545797679832, 497.2156651159481,
              625.7054147147829, 490.6365344675922, 592.1175307910397, 564.6276355603038,
              514.8572640893523, 484.47902185133046, 597.7622625233755, 559.1799635501319,
              571.7109630540343, 513.212778566814, 549.1636248727518, 462.32331107946504,
              551.0869305265527, 576.872028698758, 636.4899532813711, 479.0486254908533,
              543.761081985735, 488.9454132823779, 536.1309059508741, 534.9354940989901,
              567.6136279473333, 458.8870965420118, 514.9547377042924, 525.3278756572803,
              502.05863531061544, 575.8454944963837, 524.476069016465, 431.1190903001866,
              543.5139624946099, 598.8881832598959, 510.5100592771207, 541.151976697214,
              550.0881388522994, 485.26355742991586, 460.14344601636975,
            ],
          },
        },
      ],
      ...rest,
    };
  }
  return {
    start: '2021-11-30T16:30:00Z',
    end: '2021-12-01T16:30:00Z',
    query: 'transaction:foo',
    intervals: [
      '2021-11-30T16:30:00Z',
      '2021-11-30T16:45:00Z',
      '2021-11-30T17:00:00Z',
      '2021-11-30T17:15:00Z',
      '2021-11-30T17:30:00Z',
      '2021-11-30T17:45:00Z',
      '2021-11-30T18:00:00Z',
      '2021-11-30T18:15:00Z',
      '2021-11-30T18:30:00Z',
      '2021-11-30T18:45:00Z',
      '2021-11-30T19:00:00Z',
      '2021-11-30T19:15:00Z',
      '2021-11-30T19:30:00Z',
      '2021-11-30T19:45:00Z',
      '2021-11-30T20:00:00Z',
      '2021-11-30T20:15:00Z',
      '2021-11-30T20:30:00Z',
      '2021-11-30T20:45:00Z',
      '2021-11-30T21:00:00Z',
      '2021-11-30T21:15:00Z',
      '2021-11-30T21:30:00Z',
      '2021-11-30T21:45:00Z',
      '2021-11-30T22:00:00Z',
      '2021-11-30T22:15:00Z',
      '2021-11-30T22:30:00Z',
      '2021-11-30T22:45:00Z',
      '2021-11-30T23:00:00Z',
      '2021-11-30T23:15:00Z',
      '2021-11-30T23:30:00Z',
      '2021-11-30T23:45:00Z',
      '2021-12-01T00:00:00Z',
      '2021-12-01T00:15:00Z',
      '2021-12-01T00:30:00Z',
      '2021-12-01T00:45:00Z',
      '2021-12-01T01:00:00Z',
      '2021-12-01T01:15:00Z',
      '2021-12-01T01:30:00Z',
      '2021-12-01T01:45:00Z',
      '2021-12-01T02:00:00Z',
      '2021-12-01T02:15:00Z',
      '2021-12-01T02:30:00Z',
      '2021-12-01T02:45:00Z',
      '2021-12-01T03:00:00Z',
      '2021-12-01T03:15:00Z',
      '2021-12-01T03:30:00Z',
      '2021-12-01T03:45:00Z',
      '2021-12-01T04:00:00Z',
      '2021-12-01T04:15:00Z',
      '2021-12-01T04:30:00Z',
      '2021-12-01T04:45:00Z',
      '2021-12-01T05:00:00Z',
      '2021-12-01T05:15:00Z',
      '2021-12-01T05:30:00Z',
      '2021-12-01T05:45:00Z',
      '2021-12-01T06:00:00Z',
      '2021-12-01T06:15:00Z',
      '2021-12-01T06:30:00Z',
      '2021-12-01T06:45:00Z',
      '2021-12-01T07:00:00Z',
      '2021-12-01T07:15:00Z',
      '2021-12-01T07:30:00Z',
      '2021-12-01T07:45:00Z',
      '2021-12-01T08:00:00Z',
      '2021-12-01T08:15:00Z',
      '2021-12-01T08:30:00Z',
      '2021-12-01T08:45:00Z',
      '2021-12-01T09:00:00Z',
      '2021-12-01T09:15:00Z',
      '2021-12-01T09:30:00Z',
      '2021-12-01T09:45:00Z',
      '2021-12-01T10:00:00Z',
      '2021-12-01T10:15:00Z',
      '2021-12-01T10:30:00Z',
      '2021-12-01T10:45:00Z',
      '2021-12-01T11:00:00Z',
      '2021-12-01T11:15:00Z',
      '2021-12-01T11:30:00Z',
      '2021-12-01T11:45:00Z',
      '2021-12-01T12:00:00Z',
      '2021-12-01T12:15:00Z',
      '2021-12-01T12:30:00Z',
      '2021-12-01T12:45:00Z',
      '2021-12-01T13:00:00Z',
      '2021-12-01T13:15:00Z',
      '2021-12-01T13:30:00Z',
      '2021-12-01T13:45:00Z',
      '2021-12-01T14:00:00Z',
      '2021-12-01T14:15:00Z',
      '2021-12-01T14:30:00Z',
      '2021-12-01T14:45:00Z',
      '2021-12-01T15:00:00Z',
      '2021-12-01T15:15:00Z',
      '2021-12-01T15:30:00Z',
      '2021-12-01T15:45:00Z',
      '2021-12-01T16:00:00Z',
      '2021-12-01T16:15:00Z',
    ],
    groups: [
      {
        by: {},
        totals: {
          [field]: 129.72492971780008,
        },
        series: {
          [field]: [
            221.52973175192722, 82.76857796001401, 137.76855565875306, 100.90038107992447,
            181.2435929849948, 194.158107204712, 143.61147836258434, 185.65573515697082,
            100.21081794317811, 208.29608362878938, 118.18731151487796,
            118.85364293253053, 105.75294629990324, 75.20403467560347, 214.544293395813,
            184.79572839686938, 259.1674567193647, 158.40029989583152, 184.0986274231247,
            207.4485209902483, 137.05358932318484, 107.7828783051832, 47.80514899497001,
            194.96241884670016, 44.339642053877824, 119.57311788436749,
            172.46862378499546, 110.52822125736162, 97.68537379477962, 112.5167951143202,
            111.82948894037335, 227.48218487635415, 225.10460873407186,
            162.99752342763682, 128.22826215505037, 48.609746472922794, 133.4134656844366,
            281.1352073242249, 62.983605201790496, 196.54191513224623, 56.00924372303001,
            24.94253512920878, 221.34719312480277, 207.01235742201152, 114.299227186921,
            204.51620061218475, 152.58562296803183, 109.28922397413778, 226.7967426059135,
            176.3368036666104, 207.76689069204056, 86.29088695366825, 93.15152437398582,
            92.23842325974776, 190.44021157473708, 177.04868916460094, 251.62113508409038,
            204.5263843316348, 142.31127672743196, 56.69956554421219, 84.71704143541118,
            101.53503132614478, 99.0825523142891, 103.16935191283522, 150.30780155129622,
            121.95128186027746, 186.67045011665317, 102.83194279130588, 154.2686784193342,
            157.7944520199932, 123.45642594604843, 73.27175599497824, 129.72492971780008,
            248.61997396314618, 218.7839016972788, 182.80619304687184, 188.63265766458704,
            167.31946209197588, 191.5901915785962, 42.83932244475261, 138.16316088908889,
            120.38605530225834, 148.86304686894104, 153.00796506583956, 209.9970984934427,
            221.51233320835917, 190.18795389834187, 112.34957795400626,
            157.41872131601184, 114.55901943308214, 119.01258516262774,
            158.90458466502602, 202.19234819514645, 129.92249036747617, 94.1428682261091,
            111.76271327503883,
          ],
        },
      },
    ],
    ...rest,
  };
}