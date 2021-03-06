﻿
/*This will be a module for services*/
import { NgModule, forwardRef } from 'core';

/*Providers*/
import { Geolocation } from 'ionic-native-geolocation';
import { GeolocationMock } from '../services/ThribeAppMocks';
import { EventEmitterService } from '../services/EventEmitterService';

@NgModule({        
    providers: [
        { provide: Geolocation, useClass: GeolocationMock },
        EventEmitterService
    ]
})
export class ThribeAppServicesModule {

}