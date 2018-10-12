
// Global Application constants
export module AppConstants {
  // Used for the Infinite scroll carousel

  export class CONFIG {
    static BASE_URL:string = 'http://localhost:3000';
  }

  export class USER_ROLES {
    static SUPER_ROLES: string[] = [
      'super',
      'technician',
      'admin',
      'teacher',
      'student'
    ];
    static ADMIN_ROLES: string[] = [
      'teacher',
      'student'
    ];
  }
  export class ORGANISATIONS {
    static TYPES: string[] = [
      'regular-school',
      'yeshiva',
      'ulpana'
    ];
  }
  export class TRANSLATIONS {
    // static TICKET_STATUSES: any = {
    //   'waiting_for_approval': 'ממתין לאישור מנהל',
    //   'pending': 'מאושר לעבודה',
    //   'done': 'הסתים',
    // }
    static TICKET_STATUSES: string[] = [
      'waiting_for_approval',
      'pending',
      'done',
    ]
  }
  // export class USER_ROLES {
  //   static SUPER = 'super';
  //   static TECHNICIAN = 'technician';
  //   static ADMIN = 'admin';
  //   static TEACHER = 'teacher';
  //   static STUDENT = 'student';
  // }
  //
  // export class SCROLL_DIRECTION {
  //   static RIGHT = 1;
  //   static LEFT = -1;
  // };
  //
  // // Used for the Infinite scroll carousel
  // export class VERTICAL_SCROLL_DIRECTION {
  //   static DOWN = 1;
  //   static UP = -1;
  // };
  //
  // export class TimeInMs {
  //   static MS_ONE_SEC = 1e3;
  //   static MS_ONE_MIN = 6e4;
  //   static MS_15_MIN = 9e5;
  //   static MS_HALF_HOUR = 18e5;
  //   static MS_ONE_HOUR = 36e5;
  //   static MS_ONE_DAY = 864e5;
  //   static MS_ONE_WEEK = 6048e5;
  // }
  //
  // export class ELEMENT_READYSTATE {
  //   static LOADED = <any>"loaded";
  //   static COMPLETE = <any>"complete";
  // };
  //
  // // LOGIN Page - Constants
  // export class LoginPage {
  //   static INVALID_USER_PWD_CODE: string = 'E.01.03.050';
  // }
  //
  // export const dfwUserType = new Set(["GUEST", "DTVNOW_LEGACY", "DIRECTV_LEGACY", "NEWCO", "ATT_LEGACY", "PROSPECT"]);
  //
  // // Constants - Shared by different pages
  // export class SharedConstants {
  //   static CDN_ROOT = 'https://cdns.directv.com/content/dam/dtv/dfw/';
  //   // The below value should match the slider-container transition time defined in MultipleItemsCarousel.style file
  //   static TRANSITION_TIME: number = 500;
  //   static TRANSITION_TIME_ADDED: number = SharedConstants.TRANSITION_TIME + 75;
  //   static MISSING_IMG: string = SharedConstants.CDN_ROOT + 'assets/images/missing-poster.jpg';
  //   static ERROR_EVENT_TYPE: string = 'error';
  //   static CONTINUE_WATCHING_UPDATE_PERIOD: number = TimeInMs.MS_ONE_MIN * 8; //MS_ONE_SEC * 10; // 30
  //   static VIDEO_PLAYER_SKIP_SECONDS_GAP: number =  15; // seconds to skip/back in VOD +-
  //   static RESTART_START_PERIOD: number = TimeInMs.MS_ONE_SEC * 120; // 30
  //   static GUIDE_SERVICE_CHANNEL_COUNT = 16;
  //   static STREAM_ID: string = 'streamId';
  //
  //   static CAROUSEL_CONTAINER_ANIMATION: any = {
  //     'ANIMATE': 'slider-container',
  //     'NON_ANIMATE': 'non-slider-container'
  //   }
  //
  //   static CACHE_KEY: any = {
  //     MQTTINFO: makeStateKey('mqttInfo'),
  //     APP_CONFIG: makeStateKey('app_config'),
  //     USER_PROFILE : makeStateKey('user_profile'),
  //     USER_INFO: makeStateKey('userInfo'),
  //     LOGIN_SUCCESS: makeStateKey('login_success'),
  //     METRIC_CONFIG: makeStateKey('metrics_config'),
  //     MESSAGE_KEYS: makeStateKey('messagekeys')
  //   }
  //
  //   static SERVICE_LOCATION: any = {
  //     LIBRARY_RECORDINGS: 'MyLibrary|Recordings',
  //     PLAYER_SCHEDULE_RECORDING: 'VideoPlayer|Schedule Recording',
  //     PLAYER_DELETE_RECORDING : 'VideoPlayer|Delete Recording',
  //     PLAYER_CANCEL_RECORDING: 'VideoPlayer|Cancel Recording',
  //     COMMONINFO_SCHEDULE_RECORDING :'CommonInfo|Schedule Recording',
  //     COMMONINFO_SCHEDULE_SERIES_RECORDING :'CommonInfo|Schedule Series Recording',
  //     COMMONINFO_DELETE_RECORDING : 'CommonInfo|Delete Recording',
  //     COMMONINFO_CANCEL_RECORDING : 'CommonInfo|Cancel Recording',
  //     LIBRARY_DELETE_RECORDING :'MyLibrary|Delete Recordings',
  //     LIBRARY_CANCEL_RECORDING : 'MyLibrary|Cancel Recordings',
  //     STARTUP: 'StartUp'
  //   }
  //   static CAROUSEL_TITLE: any = {
  //     'CONTINUE_WATCHING' : 'Continue Watching',
  //     'RECENT_CHANNELS' : 'recently-watched'
  //   }
  //
  //   static  POSTER_IMG_DIMENSION: any = {
  //     'collection-landscape': {
  //       'width': 564,
  //       'height': 317.3,
  //       'rightPadding': 8
  //     },
  //     'collection-reg-md': {
  //       'width': 373,
  //       'height': 373,
  //       'rightPadding': 8
  //     },
  //     'collection-sm': {
  //       'width': 278,
  //       'height': 278,
  //       'rightPadding': 8
  //     },
  //     'landscape-lg': {
  //       'width': 278,
  //       'height': 156,
  //       'rightPadding': 8,
  //       'viewallPlaceHolderCount': 16,
  //       'viewallItemsPerLoad': 16,
  //       'numToShowInCarousel': 4,
  //       'numToScrollInCarousel': 4
  //     },
  //     'landscape-xlg': {
  //       'width': 373,
  //       'height': 209,
  //       'rightPadding': 0
  //     },
  //     'landscape-lg-1280': {
  //       'width': 215,
  //       'height': 121,
  //       'rightPadding': 0
  //     },
  //     'landscape-search': {
  //       'width': 213,
  //       'height': 120,
  //       'rightPadding': 8
  //     },
  //     'landscape-lg-340': {
  //       'width': 340,
  //       'height': 191,
  //       'rightPadding': 8,
  //       'viewallPlaceHolderCount': 9,
  //       'viewallItemsPerLoad': 15,
  //     },
  //     'landscape-sm': {
  //       'width': 213,
  //       'height': 120,
  //       'rightPadding': 0
  //     },
  //     'portrait-md': {
  //       'width': 155,
  //       'height': 232,
  //       'rightPadding': 8,
  //       'viewallPlaceHolderCount': 30,
  //       'viewallItemsPerLoad': 18,
  //       'numToShowInCarousel': 7,
  //       'numToScrollInCarousel': 7
  //     },
  //     'ppl-lg': {
  //       'width': 176,
  //       'height': 176,
  //       'rightPadding': 8
  //     },
  //     'channel': {
  //       'width': 278,
  //       'height': 208.5,
  //       'rightPadding': 8
  //     }
  //   }
  // }
  //
  // export class APP_SIZE {
  //   static WIDTH:number = 1280;
  // }
  //
  //
  // export class PlayerMode {
  //   static HOME = <any>'home';
  //   static DOCKED = <any>'docked';
  //   static POPOUT = <any>'popout';
  //   static FULLBROWSER = <any>'fullbrowser';
  //   static FULLSCREEN = <any>'fullscreen';
  //   static INACTIVE = <any>'inactive';
  // }
  // export class RecordMode {
  //   static NOT_RECORDABLE = <any>'not_recordable';
  //   static RECORDING = <any>'recording';
  //   static NOT_RECORDING = <any>'not_recording';
  // }
  //
  // export class LiveRecordStatus {
  //   static LOADING = <any>'loading';
  //   static SUCCESS = <any>'success';
  //   static CLOSE = <any>'close';
  // }
  //
  // export class PopupMessageStatus {
  //   static SELF_DISMISS = <any>'selfDismiss';
  //   static MESSAGE = <any>'message';
  // }
  //
  // export class VolumeMode {
  //   static MUTED = <any>'muted';
  //   static NOT_MUTED = <any>'not_muted';
  // }
  //
  // export class ToggleFeatureMode {
  //   static ENABLED  = <any>'enabled';
  //   static DISABLED  = <any>'disabled';
  // }
  //
  // export enum CdvrErrorStatusCode {
  //   SuccessCodeWithoutAiring = <any> '200',
  //   SuccessCodeWithAiring = <any> '201',
  //   AllEpisodesRequestedNoEpisodesFound = <any> '001',
  //   NewEpisodesRequestedNoEpisodesFound = <any> '002',
  //   NewEpisodesRequestedOldEpisodesFound = <any> '003'
  // }
  //
  // export const PremiumNetworks = [
  //   'HBO','MAX'
  // ];
  //
  // // USE BrowserDetector
  // // export const isInternetExplorer: boolean =
  // //   (isBrowser && typeof (navigator) !== 'undefined') ? ['Edge', 'Trident', 'MSIE'].reduce((result, key)=>(result || (navigator.userAgent.indexOf(key)!==-1)), false):false;
  //
  // export const arrOnErrorRedirectLoginURLs = [
  //   "/api/channels",
  //   "/api/layout",
  //   "/api/library",
  //   "/api/program",
  //   "/api/profile"
  // ];
  //
  // export const EASE_OUT_QUART: string = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
  // export const SERVICE_LOCATION: string = "service-location";

}

