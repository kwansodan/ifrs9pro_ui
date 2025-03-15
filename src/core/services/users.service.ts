import { getAxios } from "../utility";

export const GetAdminUsers = async () => await getAxios().get("/admin/users");

export const CreateAdminUser = async (payload: any) =>
  await getAxios().post("/admin/users", payload);

export const DeleteAdminUser = async (id: number) =>
  await getAxios().delete("/admin/users/" + id);

export const GetAUser = async (id: number) =>
  await getAxios().get("/admin/users/" + id);

export const UpdateAUser = async (id: number, payload: any) =>
  await getAxios().put("/admin/users/" + id, payload);
