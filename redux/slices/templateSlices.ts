import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Template, TemplateState } from "../types/templateTypes";

const initialState: TemplateState = {
  selectedTemplate: null,
  templates: [],
  filteredTemplates: [],
  selectedCategory: "all",
};

export const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
      state.filteredTemplates = action.payload;
    },
    selectTemplate: (state, action: PayloadAction<Template>) => {
      state.selectedTemplate = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === "all") {
        state.filteredTemplates = state.templates;
      } else {
        state.filteredTemplates = state.templates.filter(
          (t) => t.category === action.payload,
        );
      }
    },
  },
});

export const { setTemplates, selectTemplate, filterByCategory } =
  templateSlice.actions;
export default templateSlice.reducer;
