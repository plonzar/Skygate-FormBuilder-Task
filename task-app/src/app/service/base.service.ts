import { IdbService } from './idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';


export class BaseService {

  dbname = 'Skygate';

  constructor() {
    this.connection.setLogStatus(false);
    this.initJsStore();
  }


  get connection() {
    return IdbService.idbCon;
  }

  initJsStore() {
    this.connection.isDbExist(this.dbname).then(isExist => {
      if (isExist) {
        this.connection.openDb(this.dbname);
      } else {
        const dataBase = this.getDatabase();
        this.connection.createDb(dataBase);
      }
    }).catch(err => {
      alert(err.message);
    });
  }

  private getDatabase() {
    const tblForms: ITable = {
      name: 'Forms',
      columns: [{
        name: 'Id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'Question',
        notNull: false,
        dataType: DATA_TYPE.String
      },
      {
        name: 'Type',
        dataType: DATA_TYPE.String,
        default: 'text'
      },
      {
        name: 'DisplayConditionCondition',
        notNull: false,
        dataType: DATA_TYPE.String
      },
      {
        name: 'DisplayConditionValue',
        notNull: false
      },
      {
        name: 'ParentId',
        dataType: DATA_TYPE.Number,
        notNull: false,
        default: null
      }
      ]
    };

    const dataBase: IDataBase = {
      name: this.dbname,
      tables: [tblForms]
    };
    return dataBase;
  }

}

