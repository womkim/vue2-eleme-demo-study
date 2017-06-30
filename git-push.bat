@echo off
@title auto push bat

@echo.
@echo  =====================================================================
@echo  ===                                                               ===
@echo  ===   Only one step to push modification to your git repertory    ===
@echo  ===                                                               ===
@echo  =====================================================================

@echo.
@echo - begin to commit :
@echo -----------------------------------------------------------------
@echo - show file status...
git status
@echo.

:begin
@echo  =====================================================================
@echo  ===       Now, You should input the commit messages below:        ===
@echo  =====================================================================
@set /p input=- commit messages (Can not be null) :
if "%input%"=="" (goto begin)
rem @echo input: %input%
@echo.
@echo.

@echo - add all modified files:
git add .
@echo - show file status...
@echo -----------------------------------------------------------------
git status
@echo.

@echo - add commit to this push:
@echo -----------------------------------------------------------------
git commit -m "%input%"
@echo.
@echo.

@echo - starting push...
@echo -----------------------------------------------------------------
git push
@echo.
@echo.
@echo.

@echo - push completed! Press any key to exit!
@pause>nul