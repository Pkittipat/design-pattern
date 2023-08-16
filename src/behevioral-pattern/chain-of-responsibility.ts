
interface Department {
    setNext(department: Department): void;
    process(patient: Patient): void;
}

type Patient = {
    name: string;
    registrationDone: boolean;
    examinationDone: boolean;
    medicinesDone: boolean;
    charged: boolean;
};

class Reception implements Department {
    private nextDepartment?: Department;

    setNext(department: Department): void {
        this.nextDepartment = department;
    }

    process(patient: Patient): void {
        console.log(`Reception: ${patient.name} is registered`);
        patient.registrationDone = true;
        this.nextDepartment?.process(patient);
    }
}

class Doctor implements Department {
    private nextDepartment?: Department;

    setNext(department: Department): void {
        this.nextDepartment = department;
    }

    process(patient: Patient): void {
        if (patient.registrationDone) {
            console.log(`Doctor: ${patient.name} is examined`);
            patient.examinationDone = true;
            this.nextDepartment?.process(patient);
        } else {
            console.log(`Patient ${patient.name} is not registered yet`);
        }
    }
}

class Medical implements Department {
    private nextDepartment?: Department;

    setNext(department: Department): void {
        this.nextDepartment = department;
    }

    process(patient: Patient): void {
        if (patient.examinationDone) {
            console.log(`Medical: ${patient.name} is given medicines`);
            patient.medicinesDone = true;
            this.nextDepartment?.process(patient);
        } else {
            console.log(`Patient ${patient.name} is not examined yet`);
        }
    }
}

class Cashier implements Department {
    private nextDepartment?: Department;

    setNext(department: Department): void {
        this.nextDepartment = department;
    }

    process(patient: Patient): void {
        if (patient.medicinesDone) {
            console.log(`Cashier: ${patient.name} is charged`);
            patient.charged = true;
            this.nextDepartment?.process(patient);
        } else {
            console.log(`Patient ${patient.name} is not given medicines yet`);
        }
    }
}

const reception = new Reception();
const doctor = new Doctor();
const medical = new Medical();
const cashier = new Cashier();

reception.setNext(doctor);
doctor.setNext(medical);
medical.setNext(cashier);

const patient = {
    name: 'John',
    registrationDone: false,
    examinationDone: false,
    medicinesDone: false,
    charged: false,
};

reception.process(patient);
console.log(patient);
