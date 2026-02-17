// HR Dummy Data
import type { Employee, Attendance, Department, Designation, Shift, LeaveType, Holiday, LeaveApplication, LeavePolicy, Expense, ExpensePolicy, GradePay } from '@/types/hr';

export const employees: Employee[] = [];
export const attendanceRecords: Attendance[] = [];
export const departments: Department[] = [
  { id: 'dept-1', name: 'Rituals' },
  { id: 'dept-2', name: 'Kitchen' },
  { id: 'dept-3', name: 'Inventory' },
  { id: 'dept-4', name: 'Operations' },
  { id: 'dept-5', name: 'Admin' },
  { id: 'dept-6', name: 'Maintenance' },
  { id: 'dept-7', name: 'Security' },
  { id: 'dept-8', name: 'IT' },
];

export const designations: Designation[] = [
  { id: 'des-1', name: 'Priest' },
  { id: 'des-2', name: 'Head Cook' },
  { id: 'des-3', name: 'Store Manager' },
  { id: 'des-4', name: 'Temple Attendant' },
  { id: 'des-5', name: 'Temple Admin' },
  { id: 'des-6', name: 'Security Officer' },
  { id: 'des-7', name: 'IT Admin' },
  { id: 'des-8', name: 'Counter Staff' },
];

export const shifts: Shift[] = [
  { id: 'shift-1', name: 'Morning Shift', startTime: '06:00', endTime: '14:00' },
  { id: 'shift-2', name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00' },
  { id: 'shift-3', name: 'Night Shift', startTime: '22:00', endTime: '06:00' },
];

export const leaveTypes: LeaveType[] = [
  { id: 'leave-1', name: 'Sick Leave' },
  { id: 'leave-2', name: 'Casual Leave' },
  { id: 'leave-3', name: 'Earned Leave' },
  { id: 'leave-4', name: 'Emergency Leave' },
];

export const holidays: Holiday[] = [];

export const leaveApplications: LeaveApplication[] = [];

export const leavePolicies: LeavePolicy[] = [];

export const expenses: Expense[] = [];

export const expensePolicies: ExpensePolicy[] = [];

export const gradePays: GradePay[] = [];

export const attendancePolicies: any[] = [];

export const orgTree: any = null;
