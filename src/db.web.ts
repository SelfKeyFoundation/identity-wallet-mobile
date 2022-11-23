import { DataSource} from 'typeorm';
import { Entities, WalletEntities } from './v2/entities';


const dataSource = new DataSource({
    type: 'sqljs',
    // database: 'mobile-sk-agent',
    synchronize: true,
    location: "test",
    autoSave: true,
    logging: ['error', 'info', 'warn'],
    entities: WalletEntities
});

dataSource.initialize().then(async () => {
    console.log('data source initialized');
    // const result = await dataSource.getRepository(Wallet).create({
    //     // id: uniqueId(),
    //     address: 'some-address',
    //     id: uuid(),
    // });

    // await dataSource.getRepository(Wallet).save(result);
    

    const allWallets = await dataSource.getRepository(Entities.Wallet).find();
    console.log(allWallets);

}).catch(err => console.error(err));

