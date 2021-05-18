
import { DataLayerService } from './data-layer.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DataLayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      DataLayerService,
    ],
  }));

  it('should be created', () => {
    const service: DataLayerService = TestBed.get(DataLayerService);
    expect(service).toBeTruthy();
  });
});
