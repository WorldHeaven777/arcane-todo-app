"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AlertTriangle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useSimulateErrorMutation } from "../hooks/useSimulateErrorMutation";
import {
  TaskSortOption,
  TaskStatusFilterOption,
  useTaskFilterStore,
} from "../store/useTaskFilterStore";
import CreateTaskDialog from "./CreateTaskDialog";

export default function TaskHeader() {
  const {
    searchKeyword,
    statusFilter,
    sortOption,
    setSearchKeyword,
    setStatusFilter,
    setSortOption,
    resetAllFilters,
  } = useTaskFilterStore();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { mutate: simulateErrorMutation } = useSimulateErrorMutation();

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelectStatusFilter = (value: TaskStatusFilterOption) => {
    setStatusFilter(value);
  };

  const handleSelectSortOption = (value: TaskSortOption) => {
    setSortOption(value);
  };

  const handleClickErrorTest = () => {
    simulateErrorMutation(undefined, {
      onError: (errorObject) => {
        toast.error(
          errorObject.message ??
            "에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
          { position: "top-center" }
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="작업 제목 검색..."
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          className="flex-1 text-[14px] sm:text-[15px]"
        />

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-4"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">작업 추가</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleClickErrorTest}
          className="
            flex items-center gap-1
            border-red-300 text-red-600
            hover:text-red-700 hover:border-red-400
            px-2 sm:px-3
          "
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline">에러</span>
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="text-[14px] hover:bg-gray-100 px-3 py-2"
            >
              상태 필터 ▾
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[160px] p-0">
            <Command>
              <CommandGroup>
                <CommandItem onSelect={() => handleSelectStatusFilter("all")}>
                  전체
                </CommandItem>
                <CommandItem onSelect={() => handleSelectStatusFilter("todo")}>
                  할 일
                </CommandItem>
                <CommandItem onSelect={() => handleSelectStatusFilter("doing")}>
                  진행 중
                </CommandItem>
                <CommandItem onSelect={() => handleSelectStatusFilter("done")}>
                  완료됨
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="text-[14px] hover:bg-gray-100 px-3 py-2"
            >
              정렬 옵션 ▾
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandGroup>
                <CommandItem
                  onSelect={() => handleSelectSortOption("createdNewest")}
                >
                  최신 생성순
                </CommandItem>

                <CommandItem
                  onSelect={() => handleSelectSortOption("createdOldest")}
                >
                  오래된 순
                </CommandItem>

                <CommandItem
                  onSelect={() => handleSelectSortOption("dueDateAscending")}
                >
                  마감일 빠른 순
                </CommandItem>

                <CommandItem
                  onSelect={() => handleSelectSortOption("dueDateDescending")}
                >
                  마감일 늦은 순
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant="secondary"
          onClick={resetAllFilters}
          className="
            ml-auto px-4 py-2
            text-[14px]
            hover:bg-gray-200
          "
        >
          초기화
        </Button>
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
