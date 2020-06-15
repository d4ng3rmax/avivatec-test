import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Rick } from './rick';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ricks = [
      { id: 11, name: 'Marvel' },
      { id: 12, name: 'DC' },
      { id: 13, name: 'Terra-811' },
      { id: 14, name: 'Terra-928' },
      { id: 15, name: 'Terra-5544' },
      { id: 16, name: 'Terra-234' },
      { id: 17, name: 'Terra-148611' },
      { id: 18, name: 'Terra-0001' },
      { id: 19, name: 'Terra-93060' },
      { id: 20, name: 'Terra-1815' }
    ];
    return {ricks};
  }

  genId(ricks: Rick[]): number {
    return ricks.length > 0 ? Math.max(...ricks.map(rick => rick.id)) + 1 : 11;
  }
}
