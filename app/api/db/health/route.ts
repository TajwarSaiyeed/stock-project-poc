import {NextResponse} from "next/server";
import {connectToDatabase} from "@/database/mongoose";

export async function GET() {
    try {
        const mongoose = await connectToDatabase();
        const state = mongoose.connection.readyState; // 1 = connected

        return NextResponse.json(
            {
                ok: true,
                state,
                stateLabel:
                    state === 1
                        ? "connected"
                        : state === 2
                            ? "connecting"
                            : state === 0
                                ? "disconnected"
                                : state === 3
                                    ? "disconnecting"
                                    : "unknown",
                nodeEnv: process.env.NODE_ENV,
            },
            {status: 200}
        );
    } catch (error: unknown) {
        return NextResponse.json(
            {
                ok: false,
                error: error instanceof Error ? error.message : "Unknown database connection error",
            },
            {status: 500}
        );
    }
}
