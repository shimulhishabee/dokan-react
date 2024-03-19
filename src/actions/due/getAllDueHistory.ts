"use server";

import { authApi } from "@/lib/api";
import { cookies } from "next/headers";
import { IDueListResponse } from '@/types/due/dueResponse';

interface IGetAllDueHistory {
    page?: number;
    start_date: string;
    end_date: string;
}

export const getAllDue = async (params: IGetAllDueHistory) => {
    const { page, start_date, end_date } = params;
    try {
        const shopId = cookies().get("shopId")?.value;
        const params = `shop_id=${shopId}&start_date=${start_date}&end_date=${end_date}&page=${page}`
        const res = await authApi.get(`/due/history?${params}`);
        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                message: data.message,
                status_code: data.status_code,
                data: data.data,
            };
        }
        if (!res.ok) {
            return { success: false, error: data };
        }
    } catch {
        return { success: false, error: "Something went wrong" };
    }
};