#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousJSON)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#---------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

set(ENABLE_CJSON_TEST OFF CACHE BOOL "" FORCE)
set(ENABLE_CJSON_UTILS OFF CACHE BOOL "" FORCE)

FetchContent_Declare(
    cjson
    GIT_REPOSITORY https://github.com/DaveGamble/cJSON.git
    GIT_TAG master
)
FetchContent_MakeAvailable(cjson)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(json2vcs
    src/json2vcs.c
)

target_include_directories(json2vcs PUBLIC
    ${cjson_SOURCE_DIR}
)

target_link_libraries(json2vcs
    cjson
    vicious
)

add_executable(vcs2json
    src/vcs2json.c
)

target_include_directories(vcs2json PUBLIC
    ${cjson_SOURCE_DIR}
)

target_link_libraries(vcs2json
    cjson
    vicious
)

if(EMSCRIPTEN)
    set_target_properties(vcs2json PROPERTIES
        SUFFIX ".html"
    )

    target_link_options(vcs2json PRIVATE
        "--shell-file=${CMAKE_SOURCE_DIR}/src/vcs2json.html"
        -sALLOW_MEMORY_GROWTH
        -sEXPORTED_RUNTIME_METHODS=["FS"]
        -sMODULARIZE
    )
endif()
