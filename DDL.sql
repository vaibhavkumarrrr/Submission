
CREATE TABLE Training.Accounts (
    AccountId     INT IDENTITY(1,1) NOT NULL,
    UserId        INT NOT NULL,
    BankId        INT NOT NULL,
    DepositAmt    DECIMAL(18,2) NOT NULL,
    AccountName   NVARCHAR(MAX) NULL,
    Balance       DECIMAL(18,2) NOT NULL,
    AccountType   INT NOT NULL,
    CreatedBy     INT NOT NULL,
    ModifiedBy    INT NOT NULL,
    CreatedOn     DATETIME2 NOT NULL,
    ModifiedOn    DATETIME2 NULL,
    CONSTRAINT PK_Accounts PRIMARY KEY (AccountId)
);

CREATE TABLE Training.CurrentAccounts (
    AccountId       INT NOT NULL,
    WithDrawAmount  DECIMAL(18,2) NOT NULL,
    CONSTRAINT PK_CurrentAccounts PRIMARY KEY (AccountId)
);

CREATE TABLE Training.FDAccount (
    AccountId       INT NOT NULL,
    RateofInterest  INT NOT NULL,
    Maturitydate    DATETIME2 NOT NULL,
    CONSTRAINT PK_FDAccount PRIMARY KEY (AccountId)
);


CREATE TABLE Training.SavingsAccount (
    AccountId       INT NOT NULL,
    WithDrawAmount  DECIMAL(18,2) NOT NULL,
    CONSTRAINT PK_SavingsAccount PRIMARY KEY (AccountId)
);



CREATE TABLE Training.Users (
    UserId       INT IDENTITY(1,1) NOT NULL,
    UserName     NVARCHAR(MAX) NOT NULL,
    UserEmail    NVARCHAR(MAX) NOT NULL,
    Dateofbirth  DATETIME2 NOT NULL,
    AccountId    INT NULL,
    CreatedBy    INT NOT NULL,
    ModifiedBy   INT NOT NULL,
    CreatedOn    DATETIME2 NOT NULL,
    ModifiedOn   DATETIME2 NULL,
    CONSTRAINT PK_Users PRIMARY KEY (UserId)
);


CREATE TABLE Training.BankUser (
    UserId        INT NOT NULL,
    EmployeeId    INT NOT NULL,
    EmployeeName  NVARCHAR(MAX) NOT NULL,
    CONSTRAINT PK_BankUser PRIMARY KEY (UserId)
);
CREATE TABLE Training.Banks (
    BankId      INT IDENTITY(1,1) NOT NULL,
    BranchId    INT NOT NULL,      -- Indexed later; FK added later to Branch
    BankName    NVARCHAR(MAX) NOT NULL,
    BankType    INT NOT NULL,
    AccountId   INT NULL,
    CreatedBy   INT NOT NULL,
    ModifiedBy  INT NOT NULL,
    CreatedOn   DATETIME2 NOT NULL,
    ModifiedOn  DATETIME2 NULL,
    CONSTRAINT PK_Banks PRIMARY KEY (BankId)
);
CREATE TABLE Training.Branch (
    BranchId       INT IDENTITY(1,1) NOT NULL,
    BranchName     NVARCHAR(MAX) NOT NULL,
    BranchPincode  NVARCHAR(MAX) NOT NULL,
    BranchStatus   NVARCHAR(MAX) NOT NULL,
    BankId         INT NULL,
    CreatedBy      INT NOT NULL,
    ModifiedBy     INT NOT NULL,
    CreatedOn      DATETIME2 NOT NULL,
    ModifiedOn     DATETIME2 NULL,
    CONSTRAINT PK_Branch PRIMARY KEY (BranchId)
);
CREATE INDEX IX_Accounts_BankId ON Training.Accounts (BankId);
CREATE INDEX IX_Accounts_UserId ON Training.Accounts (UserId);

CREATE INDEX IX_Banks_AccountId ON Training.Banks (AccountId);
CREATE INDEX IX_Banks_BranchId  ON Training.Banks (BranchId);

CREATE INDEX IX_Branch_BankId ON Training.Branch (BankId);

CREATE INDEX IX_Users_AccountId ON Training.Users (AccountId);


Foreign Keys (after tables exist to resolve cycles) */


ALTER TABLE Training.CurrentAccounts
ADD CONSTRAINT FK_CurrentAccounts_Accounts_AccountId
    FOREIGN KEY (AccountId)
    REFERENCES Training.Accounts (AccountId)
    ON DELETE CASCADE;

ALTER TABLE Training.FDAccount
ADD CONSTRAINT FK_FDAccount_Accounts_AccountId
    FOREIGN KEY (AccountId)
    REFERENCES Training.Accounts (AccountId)
    ON DELETE CASCADE;

ALTER TABLE Training.SavingsAccount
ADD CONSTRAINT FK_SavingsAccount_Accounts_AccountId
    FOREIGN KEY (AccountId)
    REFERENCES Training.Accounts (AccountId)
    ON DELETE CASCADE;


ALTER TABLE Training.Users
ADD CONSTRAINT FK_Users_Accounts_AccountId
    FOREIGN KEY (AccountId)
    REFERENCES Training.Accounts (AccountId);


ALTER TABLE Training.BankUser
ADD CONSTRAINT FK_BankUser_Users_UserId
    FOREIGN KEY (UserId)
    REFERENCES Training.Users (UserId)
    ON DELETE CASCADE;


ALTER TABLE Training.Accounts
ADD CONSTRAINT FK_Accounts_Banks_BankId
    FOREIGN KEY (BankId)
    REFERENCES Training.Banks (BankId)
    ON DELETE CASCADE;

ALTER TABLE Training.Accounts
ADD CONSTRAINT FK_Accounts_Users_UserId
    FOREIGN KEY (UserId)
    REFERENCES Training.Users (UserId)
    ON DELETE CASCADE;


ALTER TABLE Training.Banks
ADD CONSTRAINT FK_Banks_Branch_BranchId
    FOREIGN KEY (BranchId)
    REFERENCES Training.Branch (BranchId)
    ON DELETE CASCADE;

ALTER TABLE Training.Banks
ADD CONSTRAINT FK_Banks_Accounts_AccountId
    FOREIGN KEY (AccountId)
    REFERENCES Training.Accounts (AccountId);


ALTER TABLE Training.Branch
ADD CONSTRAINT FK_Branch_Banks_BankId
    FOREIGN KEY (BankId)
    REFERENCES Training.Banks (BankId);
