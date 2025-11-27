import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngestionFile, IngestionState } from "../../interfaces";

const initialState: IngestionState = {
  portfolioId: null,
  files: {},
};

export const ingestionSlice = createSlice({
  name: "ingestion",
  initialState,
  reducers: {
    setIngestionData: (
      state,
      action: PayloadAction<{
        portfolioId: number;
        uploaded_files: Record<string, any>;
      }>
    ) => {
      state.portfolioId = action.payload.portfolioId;

      const mapped: Record<string, IngestionFile> = {};

      Object.entries(action.payload.uploaded_files).forEach(
        ([key, file]: any) => {
          if (!file) return;

          mapped[key] = {
            type: key,
            object_name: file.object_name,
            excel_columns: file.excel_columns,
            model_columns: file.model_columns,
          };
        }
      );

      state.files = mapped;
    },

    clearIngestionData: (state) => {
      state.portfolioId = null;
      state.files = {};
    },
  },
});

export const { setIngestionData, clearIngestionData } = ingestionSlice.actions;
export default ingestionSlice.reducer;
