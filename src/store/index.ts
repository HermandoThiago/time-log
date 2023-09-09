import { create } from "zustand";

type Log = {
  note: string;
  hour: number;
  date: Date;
};

interface LogState {
  log: Log;
  logs: {
    [key: string]: Log;
  };
  setDate: (date: Date) => void;
  setLog: (log: Log) => void;
  setLogs: (log: Log, key: string) => void;
}

export const useLogStore = create<LogState>((set) => ({
  log: {
    note: "",
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLog: (log: Log) => set((state) => ({ log: { ...state.log, ...log } })),
  setLogs: (log: Log, key: string) =>
    set((state) => ({ logs: { ...state.logs, [key]: log } })),
}));
