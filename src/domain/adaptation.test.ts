import { adaptPrescription } from "./adaptation";
import { WorkoutSession } from "./types";

const prescription={exerciseId:"bench-press",sets:3,reps:8,weightKg:60};
function session(id:string,reps:number[],completed=true):WorkoutSession{
 return {id,date:`2026-09-${id.padStart(2,"0")}T12:00:00Z`,exercises:[{exerciseId:"bench-press",sets:reps.map(r=>({reps:r,weightKg:60,completed}))}]};
}

describe("adaptPrescription",()=>{
 test("increases load after completing all targets",()=>{
  expect(adaptPrescription(prescription,[session("19",[8,8,8])]).weightKg).toBe(62.5);
  expect(adaptPrescription(prescription,[session("19",[8,8,8])]).action).toBe("increase");
 });
 test("holds after one missed target",()=>{
  expect(adaptPrescription(prescription,[session("19",[8,8,7])]).action).toBe("hold");
 });
 test("deloads after repeated misses",()=>{
  const result=adaptPrescription(prescription,[session("18",[8,7,6]),session("19",[8,7,6])]);
  expect(result.action).toBe("deload");
  expect(result.weightKg).toBe(55);
 });
});
