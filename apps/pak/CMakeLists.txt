#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousPak)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(pakdump
    src/pakdump.c
)

if(EMSCRIPTEN)
    set_target_properties(pakdump PROPERTIES
        SUFFIX ".html"
    )

    target_link_options(pakdump PRIVATE
        "--shell-file=${CMAKE_SOURCE_DIR}/src/pakdump.html"
        -sALLOW_MEMORY_GROWTH
        -sEXPORTED_RUNTIME_METHODS=["FS"]
        -sMODULARIZE
    )
endif()
