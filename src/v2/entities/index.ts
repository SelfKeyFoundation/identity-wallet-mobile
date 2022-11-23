import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity({
    schema: 'wallet', name: 'wallet', synchronize: true
})
export class Wallet {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string;

    @Column({
        type: 'text',
    })
    secretsId: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    name: string;
}

@Entity({
    schema: 'wallet', name: 'walletAddress', synchronize: true
})
export class WalletAddress {
    @PrimaryColumn({
        type: 'text',
    })
    address: string;

    @Column({
        type: 'uuid',
    })
    walletId: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    icon: string;
}

@Entity({
    schema: 'wallet', name: 'WalletSecrets', synchronize: true
})
export class WalletSecrets {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    privateKey: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    mnemonic: string;
}


export const Entities = {
    Wallet,
    WalletAddress,
    WalletSecrets
}

export const WalletEntities = [Wallet, WalletAddress, WalletSecrets];
