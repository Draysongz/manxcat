import Button from "../components/ui/Button";
import TaskCards from "../components/ui/TaskCards";
import React, { useEffect, useState } from "react";
import { getAllTasks, ITask } from "../services/apiTasks";
import NavigationBar from "../components/NavigationBar";
import { useTranslation } from "react-i18next";

const Tasks = () => {
  const {t} = useTranslation()
  const [tasks, setTasks] = useState<ITask[]>();
  useEffect(() => {
    const getTasks = async () => {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    };
    getTasks();

    return () => {};
  }, []);
  return (
    <main className="page-style">
      <div className="flex flex-col items-center">
        <img
          alt="cat image"
          src="/cats/task-cat.png"
          className="relative w-95%"
        />
        <div className="absolute xs:top-[220px] xx:top-[260px] xr:top-[290px]">
          <h1 className="text-center font-extrabold text-[32px] mb-2">
            {t("tasks.title")}
          </h1>
          <p className="text-center text-sm">{t("tasks.subtitle")}</p>
        </div>
      </div>
      <div className="flex flex-col mt-3 mb-10">
        <div className="flex flex-col items-center px-7 py-3 cards space-y-5">
          <p className="uppercase font-semibold text-xs">
            {t("tasks.completeTasksInfo")}
          </p>
          <div className="flex items-center">
            <span className="circle-span" />
            <span className="rectangle-span" />
            <span className="circle-span" />
            <span className="rectangle-span" />
            <img src="/ticket1.svg" alt="ticket" className="inline w-4 h-7" />
          </div>
          <Button name={t("tasks.claimButton")} />
        </div>
        <div className="flex flex-col space-y-4 mt-8">
          <h1 className="text-center font-extrabold text-[25px] leading-8">
            {t("tasks.specialTasksTitle")}
          </h1>
          <div className="cards flex flex-col items-center px-7 py-3 space-y-5">
            <div className="flex space-x-3">
              <div className="p-2 flex bg-[#EFD0CA] rounded-full justify-center items-center">
                <img
                  src="/wallet.png"
                  alt="wallet"
                  className="w-10 h-8 justify-center"
                />
              </div>
              <div className="flex flex-col justify-end">
                <h1 className="font-extrabold text-sm">
                  {t("tasks.uploadTaskTitle")}
                </h1>
                <p className="text-xs">{t("tasks.uploadTaskDescription")}</p>
              </div>
            </div>
            <Button name={t("tasks.applyButton")} link="/apply" />
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <div className="flex flex-col">
            <h1 className="text-center font-extrabold text-[25px] leading-8">
              {t("tasks.tasksTitle")}
            </h1>
            <p className="text-xs">{t("tasks.tasksCompletion")}</p>
          </div>
          <TaskCards tasks={tasks} />
        </div>
      </div>
      <NavigationBar />
    </main>
  );
};

export default Tasks;
